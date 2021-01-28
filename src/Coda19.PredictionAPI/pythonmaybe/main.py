import numpy as np
import json
from keras.preprocessing.sequence import TimeseriesGenerator
from tensorflow import keras
import tensorflow as tf
from keras.models import Sequential
from keras.layers import LSTM, Dense
import plotly.graph_objects as go

data = {}

with open('owid-covid-data.json') as f:
    data = json.load(f)

cases = data["ROU"]["data"]
cases_data = [x for x in list(map(lambda x:x.get("new_cases"), cases)) if x]
index_data = [x for x in list(map(lambda x:x.get("stringency_index"), cases)) if x]

cases_data = np.array(cases_data).reshape((-1, 1))
split = int(0.8 * len(cases_data))

cases_train = cases_data[:split]
cases_test = cases_data[split:]
cases_index = [x for x in range(len(cases_train))]

print(len(cases_train))
print(len(cases_test))

lookback = 14
train_gen = TimeseriesGenerator(cases_train, cases_train, length = lookback, batch_size = 14)
test_gen = TimeseriesGenerator(cases_test,cases_test, length = lookback, batch_size = 1)

def getModel():
    m_model = Sequential()
    m_model.add(
        LSTM(10,
            activation='relu',
            input_shape=(14, 1)))
    m_model.add(Dense(1, "relu"))
    m_model.compile(optimizer='adam', loss='mse')
    m_model.fit(train_gen, epochs = 30, verbose = 1)
    m_model.save("coda-model")
    return m_model

model = keras.models.load_model("coda-model")
#model = getModel()

prediction = model.predict(test_gen)

cases_test = cases_test.reshape((-1))
prediction = prediction.reshape((-1))

def predict():
    prediction_list = cases_test[14:]
    for _ in range(14):
        x = prediction_list[-14:]
        x = x.reshape((1,14,1))
        out = model.predict(x)[0][0]
        prediction_list = np.append(prediction_list, out.reshape((-1)))
    
    prediction_list = prediction_list[14:]

    return prediction_list

extra_prediction = predict()

trace1 = go.Scatter(
    x = cases_index,
    y = np.append(prediction,extra_prediction),
    mode = 'lines',
    name= 'prediction'
)

trace2 = go.Scatter(
    x = cases_index,
    y = cases_test, 
    mode = 'lines',
    name = 'real'
)

fig = go.Figure(data = [trace1, trace2])
fig.show()


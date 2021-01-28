from tensorflow import keras
import numpy as np
from flask import request
from flask import Flask

app = Flask(__name__)
model = keras.models.load_model("coda-model")

def predict(data):
    prediction_list = data
    for _ in range(14):
        x = prediction_list[-14:]
        x = x.reshape((1,14,1))
        out = model.predict(x)[0][0]
        prediction_list = np.append(prediction_list, out.reshape((-1)))
    
    prediction_list = prediction_list[14:]

    return prediction_list

@app.route('/')
def get():
  inp = request.args.getlist('data')
  data = [int(x) for x in inp]
  prediction = predict(np.array(data).reshape((-1)))
  
  res = '['
  for p in prediction:
    res = res + str(p) + ','
  res = res[:-1] + ']'
  return res
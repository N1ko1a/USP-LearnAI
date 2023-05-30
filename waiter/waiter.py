
import pymongo
import random
import requests
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient("localhost", 27017, maxPoolSize=50)
db = client["GPTDB"]
collection = db['prompts']
cursor = collection.find()
#prompt_list = []
#answer_list = []
'''
for document in cursor:
    prompt_list.append(document['prompt'])
collection = db['answers']
cursor = collection.find()
for document in cursor:
    answer_list.append(document['answer'])
for i, prompt in enumerate(prompt_list):
    context += "\r\n ME: " + prompt + "\n" + "\r\nLearnGPT: " + answer_list[i] + "\n"
'''
@app.route('/', methods=['POST'])
def handle_post():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any necessary actions
    # You can access specific fields of the JSON data using data['field_name']
    waiter = Waiter()
    context = "ME:Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. Correct my grammar mistakes and talk with me about things, and freely ask any questions.\n ChatGPT:Ok.\n"
    r = waiter.request(context + " " + data['prompt'] + "\n")
    # Return a response
    response = {'message': 'POST request received', 'data': r}
    return response, 200

class Waiter:

    _urls = ["https://free.churchless.tech/v1/chat/completions"]
    
    def __init__(self) -> None:
        pass
    
    def getURL(self):
        return random.choice(self._urls)
    
    def request(self,wish) ->str:
        url = self.getURL()
        payload = {
            "model":"gpt-3.5-turbo",
            "messages": [{"role": "user","content":wish},
                         {
          "role": "system",
          "content": "Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. \
          Correct grammar mistakes and talk with user about things, and freely ask any questions. Initiate conversations. Focus on conversating with your students. Your lectures are only 1 on 1."
       }]
            
        }
        headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
        r = requests.post(url, json=payload, headers=headers)
        try:
            return r.json().get("choices")[0].get("message").get("content")
        except:
            print(r.json())
            return r.json().get("choices")
        


def main():
    app.run()

if __name__=='__main__':
    main()

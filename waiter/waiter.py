
import pymongo
import random
import requests
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)
global context
context=""
client = pymongo.MongoClient("localhost", 27017, maxPoolSize=50)
db = client["GPTDB"]
collection = db['prompts']
cursor = collection.find()
prompt_list = []
answer_list = []

for document in cursor:
    prompt_list.append(document['prompt'])
collection = db['answers']
cursor = collection.find()
for document in cursor:
    answer_list.append(document['answer'])
for i, prompt in enumerate(prompt_list):
    context += "\r\n USER: " + prompt + "\n" + "\r\LearnAI: " + answer_list[i] + "\n"
    
    


    
print(context)

@app.route('/', methods=['POST'])
def handle_post():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any necessary actions
    # You can access specific fields of the JSON data using data['field_name']
    waiter = Waiter()
    global context
    context +=  "\n" + "USER: " + data['prompt'] + "\n"
    r = waiter.request(context)
    context +=  "\r\nLearnGPT: " + r + "\n"
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
            "messages": [
                         {
          "role": "system",
          "content": "You're an enthusiastic English teacher who likes to present himself in a fun way. Your nickname is LearnAI. Only greet student once. Do not break character or speak in any other language than English. \
            Initiate conversations, give user assignments. Focus on conversating with your students. Your lectures are only 1 on 1.\
           and ask questions. Recommend a topic if there isn't one present. Occasionally ask user to complete or correct a sentence or a word gramatically.\
             Always correct user's grammatical and other errors. When recommending adjectives, provide their definition. Pay attention to the history that is fed to you. Do not include your nickname in the answers."
       },{"role": "user","content":wish}]
            
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

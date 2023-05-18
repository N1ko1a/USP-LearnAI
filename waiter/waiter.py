
import pymongo
import random
import datetime
import requests









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
            "messages": [{"role": "user","content":wish}]
            
        }
        headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
        r = requests.post(url, json=payload, headers=headers)
        return r.json().get("choices")[0].get("message").get("content")
        


def main():
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
    waiter = Waiter()
    r = waiter.request("ME:Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. Correct my grammar mistakes and talk with me about things, and freely ask any questions.\n ChatGPT:Ok.\nME:Hello! Do you like apples?\nChatGPT:I do not have a capability of liking a fruit.\n ME:I liek aples")
    print(r)
    #records.insert_one({'ime': 'ChatGPT', 'poruka': r, 'vreme': datetime.datetime.now()})

if __name__=='__main__':
    main()


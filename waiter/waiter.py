
import pymongo
import random
import datetime
import requests



client = pymongo.MongoClient('mongodb+srv://ivanovicn98:Otakustream1@cluster0.dobiyo6.mongodb.net/?retryWrites=true&w=majority')
db = client.get_database('learnAI_db')
records = db.messages





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
    waiter = Waiter()
    r = waiter.request("ME:Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. Correct my grammar mistakes and talk with me about things, and freely ask any questions.\n ChatGPT:Ok.\nME:Hello! Do you like apples?\nChatGPT:I do not have a capability of liking a fruit.\n ME:I liek aples")
    print(r)
    records.insert_one({'ime': 'ChatGPT', 'poruka': r, 'vreme': datetime.datetime.now()})
if __name__=='__main__':
    main()


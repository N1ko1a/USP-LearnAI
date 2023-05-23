import requests

context = "ME:Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. Correct my grammar mistakes and talk with me about things, and freely ask any questions. Initiate conversations.\n ChatGPT:Ok.\n"



url = "https://free.churchless.tech/v1/chat/completions"
payload = {
"model":"gpt-3.5-turbo",
"messages": [{"role": "user","content":"context"}]

}
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.post(url, json=payload, headers=headers)
print(r.json().get("choices")[0].get("message").get("content"))

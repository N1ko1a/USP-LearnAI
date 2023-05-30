import requests

context = "hello! How ar you?"



url = "https://free.churchless.tech/v1/chat/completions"
payload = {
"model":"gpt-3.5-turbo",
"messages": [{"role": "user","content":"context"},
             {
          "role": "system",
          "content": "Pretend you're an enthusiastic english teacher. Do not break character or speak in any other language than english. \
          Correct grammar mistakes and talk with user about things, and freely ask any questions. Initiate conversations. Focus on conversating with your students. Your lectures are only 1 on 1."
       }]

}
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.post(url, json=payload, headers=headers)
print(r.json().get("choices")[0].get("message").get("content"))

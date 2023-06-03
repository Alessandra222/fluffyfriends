import nltk
import numpy as np
import random
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords
import requests

response = requests.get('http://localhost:3000')
raw = response.text

raw = raw.lower()
sent_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)
lemmer = nltk.stem.WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

def get_response(user_response):
    robo_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words=stopwords.words('spanish'))
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    
    if req_tfidf == 0:
        robo_response = "Lo siento, no te he entendido. Si no puedo responder a lo que buscas, por favor, ponte en contacto con soporte@soporte.com"
        return robo_response
    else:
        robo_response = sent_tokens[idx]
        return robo_response

SALUDOS_INPUTS = ("hola", "buenas", "saludos", "qué tal", "hey", "buenos dias")
SALUDOS_OUTPUTS = ["Hola", "Hola, ¿Qué tal?", "Hola, ¿Cómo te puedo ayudar?", "Hola, encantado de hablar contigo"]

def saludos(sentence):
    for word in sentence.split():
        if word.lower() in SALUDOS_INPUTS:
            return random.choice(SALUDOS_OUTPUTS)

def MetodoPython(user_message):
    user_response = user_message.lower()
    
    if user_response != 'salir':
        if user_response == 'gracias' or user_response == 'muchas gracias':
            return user_response
        else:
            if saludos(user_response) is not None:
                return saludos(user_response)
            else:
                return get_response(user_response)
    else:
        return "Nos vemos pronto, ¡cuídate!"

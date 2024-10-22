import spacy

nlp = spacy.load("en_core_web_sm")

async def extract_entities(news_data):
    entities = []
    for article in news_data['articles']:
        doc = nlp(article['description'])
        article_entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]
        entities.append({'title': article['title'], 'entities': article_entities})
    return entities
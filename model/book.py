import pandas as pd

# input: emotion / output: book info dataframe (initial)
def emotion_book_csv(emotion):
    filename = f'{emotion}_topic_labeled_genre.csv'
    df = pd.read_csv(filename, encoding='cp949')
    return df

# question1: genre
def filter_by_genre(df, genre):
    # if genre not in df['genre'].unique():
    #     raise ValueError(f"Genre '{genre}' not found in the data.")
    return df[df['genre'] == genre]

# question2: topic
def filter_by_topic(df, topic):
    topic_str = f"Topic #{topic}"
    # if topic_str not in df['topic'].unique():
    #     raise ValueError(f"Topic '{topic_str}' not found in the data.")
    return df[df['topic'] == topic_str]

# parse csv
def get_book_details(df):
    top_books = df.sort_values(by=['rate', 'book_name'], ascending=[False, True]).head(5)
    return top_books[['book_name', 'book_explain', 'author', 'publisher', 'price', 'rate', 'book_imgurl']]

def get_books_info(emotion, genre, topic):
    df = emotion_book_csv(emotion)
    df_filtered = filter_by_genre(df, genre)
    if topic:
        df_filtered = filter_by_topic(df_filtered, topic)
    book_details = get_book_details(df_filtered)
    return book_details


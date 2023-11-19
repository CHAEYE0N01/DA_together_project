from flask import Flask, render_template, request, jsonify
from test import predict

# Flask 객체 인스턴스 생성
app = Flask(__name__)

# 첫 접속 화면 - html 활용
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form['user_input']
        result = predict(user_input)
        response = f"당신에게서 {result}의 감정이 느껴집니다."
        return render_template('index.html', user_input=user_input, response=response)
    return render_template('index.html', user_input='', response='')

@app.route('/analyze', methods=['POST'])
def send():
    data = request.get_json()
    sentence = data['sentence']
    result = predict(sentence)
    return jsonify({'response': f"당신에게서 {result}의 감정이 느껴집니다."})

if __name__=="__main__":
    app.run(debug=True)
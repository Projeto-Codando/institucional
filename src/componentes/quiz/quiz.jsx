import './quiz.css'

export default function Quiz(props) {
    return (
        <div className='quiz'>
            <div className='topBarQuiz'>
                <span>&lt; Voltar</span>
                <span className='tituloTopBar'>QUIZ</span>
                <span>2 de 7</span>
            </div>
            <div className='linhaDivisor'></div>
            <div className='tituloQuiz'> <span>Quantos passos o macaco tem que andar para pegar a banana ?</span>
            </div>
            <div className='exemplo'>

            </div>
            <div className='quizRespostas'>
                <div class="quiz-question">
                    <div class="quiz-option" data-correct="true">
                        <div class="circle"></div>
                        <span>1</span>
                    </div>
                    <div class="quiz-option" data-correct="false">
                        <div class="circle"></div>
                        <span>2</span>
                    </div>
                    <div class="quiz-option" data-correct="false">
                        <div class="circle"></div>
                        <span>3</span>
                    </div>
                    <div class="quiz-option" data-correct="false">
                        <div class="circle"></div>
                        <span>4</span>
                    </div>
                </div>

            </div>
        </div>
    )
}



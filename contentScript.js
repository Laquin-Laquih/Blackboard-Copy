function copyButtonHandler()
{
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    var parentElement = this.parentElement;

    var question = parentElement.getElementsByClassName('question-container')[0].innerText;

    var answers = [];
    var finished = false;
    var i = 0;

    while(!finished)
    {
        var newAnswer = parentElement.getElementsByClassName('js-multiple-answer-answer-' + i);
        if (newAnswer.length > 0 && newAnswer[0].innerText != "Dejar en blanco (no restar)")
        {
            answers.push(alphabet[i] + ") " + newAnswer[0].innerText);
            i++;
        }
        else
        {
            finished = true;
        }
    }

    var completeProblem = question + "\n\n" + answers.join('\n');

    navigator.clipboard.writeText(completeProblem);
}

function loadExtension()
{
    console.log("content script loaded");

    //create copy button
    var copyButton = document.createElement('button');
    copyButton.style = 'background-color:#E3EFE8; border-radius:2px; padding:8px; font-family:"Courier New", monospace; font-size:18px; margin:20px;'
    copyButton.className = 'copy-button';
    copyButton.title = 'Copy to clipboard';
    copyButton.innerText = 'Copy';
    
    answerAttempts = document.getElementsByClassName("multiple-answer-attempt-authoring");
    console.log("answerAttempts.length", answerAttempts.length)
    for (var i = 0; i < answerAttempts.length; i++)
    {
        answerAttempts[i].appendChild(copyButton.cloneNode(true));
    }
    
    //add event listener to copy button
    var copyButtons = document.getElementsByClassName('copy-button');
    for (var i = 0; i < copyButtons.length; i++)
    {
        copyButtons[i].addEventListener('click', copyButtonHandler);
    }
}

setTimeout(loadExtension, 7000);
const createNoteBtn = document.querySelector('#create-note-btn')
const right = document.querySelector('.right')
const contentDiv = document.querySelector('.contents')


window.onload=function(){


    onLoading()
    
}


let localStorageData = []
let data=[]
let array = []
let controlOfControlChild = ''

let inputId = ''
let textId = ''

createNoteBtn.addEventListener('click',()=>{
    let renderHtml = `
    <div class="whole-div">
        <input id="input-id" type='text' placeholder="Enter Title">
        <hr>
        <textarea name="" id="text-id" cols="30" rows="10" placeholder="Enter Content here "></textarea>
        <button id='add-note'>Add Note</button>
    </div>`

    right.innerHTML = renderHtml


     inputId = document.querySelector('#input-id')
     textId = document.querySelector('#text-id')

    const addNote = document.querySelector('#add-note')

    document.querySelector("#add-note").addEventListener('click',()=>{
        if(inputId.value === '' && textId.value === ''){
            alert('Please fill the both forms')
            
        }else{
            let randomNumber =  Math.floor(Math.random()*1000)
            data ={
                title : inputId.value,
                content: textId.value
            }
            inputId.value = ''
            textId.value =''

            renderleftHtml(data.title,data.content,randomNumber)
            addDataToLocalStorage(data,randomNumber)
        }
    })
    
    

    })

    function renderleftHtml(title,content,randomNumber){

        let itemsDivclassquery= ''             
            const itemsDiv = document.createElement('div')
            const titleTag = document.createElement('h3')
            const contentTag = document.createElement('p')
    
            titleTag.innerText = title
            contentTag.innerText = content
            itemsDiv.classList.add('cont',randomNumber)
             itemsDiv.append(titleTag, contentTag)
            document.querySelector('.contents').append(itemsDiv)
            passRandomNumber(randomNumber)
    }

    function addDataToLocalStorage(data,randomNumber){

        note = {...data,randomNumber}
        localStorageData.push(note)

        localStorage.setItem('data',JSON.stringify(localStorageData))

        
    }

    function getItemsFromLocalStorage(){

        let parsedElement = JSON.parse(localStorage.getItem('data'))

        parsedElement.forEach(item=>{
            renderleftHtml(item.title,item.content)
            
        })
    }

    function onLoading(){
        const refreshedData = JSON.parse(localStorage.getItem('data'))
        refreshedData.forEach(refreshedItem=>{

            localStorageData.push(refreshedItem)
        })
        
        console.log(refreshedData.length)

        if(JSON.parse(localStorage.getItem('data')).length >0){

            right.innerHTML = `<div class="onRight"><div>`

        }
    }
    
    function letTryFunction(data,randomNumber ){

        document.querySelectorAll('.cont').forEach(element=>{
            element.addEventListener('click',()=>{

                renderRightHtml(element.childNodes[0],element.childNodes[1],element,randomNumber)
})
})

    }

function passRandomNumber(randomNumber){
contentDiv.addEventListener('click', () => {
    letTryFunction(data,randomNumber)

})
}

function renderRightHtml(first,second,element,randomNumber){




    let rendercontentHtml = `  <div class="control">
                <div class="combine">
                    <h2>${first.textContent}</h2>
                    <div class='buttons'>
                        <button class='add-btn'>Add Task</button>
                        <button class='delete-btn'>delete button</button>
                    </div>
                </div>
                <hr>
            <div class='entered-content'>${second.textContent}<div>
            <div class="h3-task"></div>
            <div class="save-task">
        
            </div>
            <div class="add-task-div"></div>
            </div>`
            right.innerHTML = rendercontentHtml

            const addBtn = document.querySelector('.add-btn')




            document.querySelector('.add-btn').addEventListener('click',()=>{
                let renderAddBtnHtml = ` <div class="enterTask">
            <input type="text" id="enter-task-input" placeholder="enter task">
            <button id="add-task">Add Task</button>
            </div>`
        
                
                document.querySelector('.add-task-div').innerHTML = renderAddBtnHtml
        
            const enterTaskInput = document.querySelector('#enter-task-input')
            console.log(enterTaskInput)
                // console.log(document.querySelector('.h3-task'))
        
        
            document.querySelector('#add-task').addEventListener('click',()=>{
                let renderTasksHtml = ``
                let renderH2Html = `<h2>Task Details</h2>`
        
                document.querySelector('.h3-task').innerHTML = renderH2Html
                array.push(enterTaskInput.value)
                console.log(array)
                array.forEach(num=>{
        
                     renderTasksHtml = `
                    <ul><li>${num}</li></ul>`
                    
                    
                })
                document.querySelector('.save-task').innerHTML += renderTasksHtml
                
               
        
                document.querySelector('#add-task').parentElement.remove()
        
            })
        
            })
        

        
            document.querySelector('.delete-btn').addEventListener('click',()=>{
                document.querySelector('.delete-btn').parentElement.parentElement.parentElement.remove()
                
                element.remove()

                console.log(element.childNodes[0].innerHTML)

            let forDeleteArray = JSON.parse(localStorage.getItem('data'))

            let index  =  forDeleteArray.findIndex(item=>{
                    
                    return element.childNodes[0].innerHTML == item.title
                })
            
                console.log(index)
            forDeleteArray.splice(index,1)

            localStorage.setItem('data',JSON.stringify(forDeleteArray))
            })

        
        
        
    
}

getItemsFromLocalStorage()



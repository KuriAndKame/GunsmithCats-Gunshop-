

const popupOverlay = document.getElementById("popup-overlay");
const popup = document.getElementById("popup");
const password = document.getElementById("password");


function showPopup() {
  if(sessionStorage.getItem('id')){
window.location.href = './user.html'
  } else {
    popupOverlay.style.display = "block";
  }
}
 
function hidePopup() {
  popupOverlay.style.display = "none";
}

function validatePassword(password){
  const hasRu = /[а-я,А-Я]/.test(password) // Проверка на русский язык
  const minLength = 9; // Минимальная длина пароля
  const hasUpperCase = /[A-Z]/.test(password); // Наличие заглавных букв
  const hasLowerCase = /[a-z]/.test(password); // Наличие строчных букв
  const hasNumbers = /\d/.test(password); // Наличие цифр
  const hasSpecialChars = /[_]/.test(password); // Наличие специальных символов

  // Проверка всех условий
  if (password.length < minLength) return "The password must contain at least 9 characters.";
  if (!hasUpperCase) return "The password must contain at least one capital letter.";
  if (!hasLowerCase) return "The password must contain at least one lowercase letter.";
  if (!hasNumbers) return "The password must contain at least one number.";
  if (!hasSpecialChars) return "The password must contain at least one special character.";
  if (hasRu) return "The password must not contain Russian letters.";

  return ""; // Пароль валиден
}

// function checkPassword() {
  // const passwordInput = document.getElementById("password").value;
  // const errorMessage = validatePassword(passwordInput);
  // const errorMessageElement = document.getElementById("error-message");

  // if (errorMessage) {
    // errorMessageElement.textContent = errorMessage; // Отображаем сообщение об ошибке
  // } else {
    // errorMessageElement.textContent = ""; // Очищаем сообщение об ошибке
    // Здесь можно добавить код для успешного входа
    // console.log("The password is valid. Login...");
  // }
// }

function validateEmail(email){
  const hasRu = /[а-я, А-Я]/.test(email); // Проверка на русский язык
  const hasSobaka = /[@]/.test(email); // Проверка на наличие @
  const minLength = 8; // Минимальная длинна

  // Проверка условий
  if(email.length < minLength || !hasSobaka || hasRu) return "Enter correct email";

  return ""; // Почта валидна
}


// function checkEmail(){
  // const emailInput = document.getElementById("Email").value;
  // const emailMessage = validateEmail(emailInput);
  // const errorMessageElement = document.getElementById("error-message");

  // if(errorMessage){
    // errorMessageElement.textContent = errorMessage; // Отображаем сообщение об ошибке
  // } else {
    // errorMessageElement.textContent = ""; // Очищаем сообщение об ошибке
    // console.log("Email is valid");
  // }
// }

async function checkCredentials() {
  const emailInput = document.getElementById("Email").value;
  const passwordInput = document.getElementById("password").value;
  const errorMessageElement = document.getElementById("error-message");

  console.log(emailInput)
  console.log(passwordInput)

  // Validate email
  const emailMessage = validateEmail(emailInput);
  // Validate password
  const passwordMessage = validatePassword(passwordInput);

  // Check for errors and display them
  if (emailMessage) {
    errorMessageElement.textContent = emailMessage; // Отображаем сообщение об ошибке
  } else if (passwordMessage) {
    errorMessageElement.textContent = passwordMessage; // Отображаем сообщение об ошибке
  } else {
    errorMessageElement.textContent = ""; // Очищаем сообщение об ошибке
    console.log("Email and password are valid. Logging in...");
    
    try {
      const body = {
        email : emailInput,
        password : passwordInput
      }

      const response = await fetch('http://localhost:3020/api/user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
      });

      if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('username', data.email)
      sessionStorage.setItem('id', data.user_id)
      window.location.href = './user.html'
  } catch (error) {
      console.error("Ошибка при входе:", error);
  }
  }
}
 
 if (popupOverlay) popupOverlay.addEventListener("click", hidePopup);
  if (popup) popup.addEventListener("click", (event) => event.stopPropagation());


/*document.addEventListener((e)=>{
    if (e.target != popupOverlay)
  })
*/
if (document.getElementById('loginBtn'))
document.getElementById('loginBtn').onclick = async () => {
  await checkCredentials()
}
console.log(document.getElementById('deleteBtn'))

if(document.getElementById('deleteBtn'))
  document.getElementById('deleteBtn').onclick = async () => {
    const response = await fetch(`http://localhost:3020/api/user/${sessionStorage.getItem('id')}`, {
      method : 'DELETE'
    })
    window.location.href = './index.html'
    sessionStorage.clear()
  }

async function getUser () {
  const response = await fetch(`http://localhost:3020/api/user/${sessionStorage.getItem('id')}`)
  const body = await response.json()

  console.log(body)
}

window.onload = async () => {
  if (window.location.href == 'http://127.0.0.1:5500/user.html') {
    const response = await fetch(`http://localhost:3020/api/user/${sessionStorage.getItem('id')}`)
    const body = await response.json()

    console.log(body)
    document.getElementById('updateEmail').value = body.email
    document.getElementById('updatePassword').value = body.password
  }
}

if(document.getElementById('updateBtn'))
  document.getElementById('updateBtn').onclick = async () => {

    const emailInput = document.getElementById("updateEmail").value;
    const passwordInput = document.getElementById("updatePassword").value;
    const body = {
      email : emailInput,
      password : passwordInput
    }
    const response = await fetch(`http://localhost:3020/api/user/${sessionStorage.getItem('id')}`, {
      method : 'PUT',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
    })

    sessionStorage.setItem('username', emailInput)

    window.location.reload()
  }


  const products = [
    { id: 1, name: "ak15", url: "/ak15.html" }
];

if (document.getElementById('SearchBtn')) {
    document.getElementById('SearchBtn').onclick = () => {
        const searchInput = document.getElementById("Search").value.trim(); 
        if (searchInput) {
            const product = products.find(p => p.name.toLowerCase() === searchInput.toLowerCase());
            if (product) {
                window.location.href = product.url;
            } else {
                console.log("No matching product found."); 
            }
        } else {
            console.log("Please enter a search term.");
        }
    };
}



if (document.getElementById('AddBtn')) {
  document.getElementById('AddBtn').onclick = async () => {
      const nameInput = document.getElementById("nameOfGoodId").value;
      const typeInput = document.getElementById("typeOfGoodId").value;
      const priceInput = document.getElementById("priceId").value;
      const countInput = document.getElementById("countId").value;
      const body = {
          nameofgood: nameInput,
          typeofgood: typeInput,
          price: parseInt(priceInput), // Преобразуем в число
          count: parseInt(countInput) // Преобразуем в целое число
      }
      try {
        const response = await fetch('http://localhost:3020/api/goods', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });
        console.log(12334233)

          if (!response.ok) {
              throw new Error('Ошибка при добавлении товара');
          }

          const newGood = await response.json();
          console.log('Товар добавлен:', newGood);

          // Добавляем новый товар в массив products
          products.push({
              id: newGood.id, // Предполагается, что сервер возвращает id нового товара
              nameOfGood: newGood.nameofgood,
              typeOfGood: newGood.typeofgood,
              price: newGood.price,
              count: newGood.count,
              photo: newGood.photo || "/images/default.jpg", // Укажите путь к изображению по умолчанию
              info: newGood.info || "Nothing", // Укажите информацию по умолчанию
              refPath: "/#.html"  
          });

          window.location.reload(); // Перезагружаем страницу для обновления данных
      } catch (error) {
          console.error('Ошибка:', error);
          document.getElementById('error-message').innerText = 'Не удалось добавить товар: ' + error.message;
      }
  }
}
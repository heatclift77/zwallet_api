<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=300px src="https://i.ibb.co/PWw6SGx/image-2021-04-19-075223.png" alt="logo"></a>
</p>

<h3 align="center">Backend ZWALLET - Arkademy</h3>


## About
THIS PROJECT FOR ZWALLET APP, TASK FROM ARKADEMY

## Schema
<img src="https://iili.io/BkPlqJ.jpg" alt="logo"></a>

## 🔖Build With

* Node Js
* Express JS
* **JWT** for Authentication
* **Nodemailer** for Mailer
* **Multer** for Upload file

<br>

#### User Endpoint

|  METHOD  |             API             |                    REMARKS                    |
| :------: | :-------------------------: | :-------------------------------------------: |
|  `POST`  |       /user/register        |      Register User and Activation Email       |
|  `POST`  |        /user/login          |        Sign in with a verified account        |
|  `POST`  |        /user/cekPin         |      cek Pin for authentication and security  |
|  `GET`   |        /user/saldo          |          get saldo from wallet by email       |
|  `GET`   |       /user/search          |              Get data user by name            |
|  `GET`   |       /user/cekAcount       |              cek Validation account           |
|  `GET`   |       /user/cekToken  |              verification new email which has been registered        |
|  `GET`   |       /user//verifycation/:email  |     verification new email which has been registered     |
|  `PUT`   |       /user/                |             update user profile               |
|  `PUT`   |       /user/changePin       |             change pin user                   |
|  `PUT`   |       /user/changeImage     |             change profile image user         |

#### Transaction Endpoint

|  METHOD  |       API        |          REMARKS           |
| :------: | :--------------: | :------------------------: |
|  `POST`  |     /transaction    | Transfer |
|  `GET`   | /transaction |    Get List Transaction   |
|  `GET`   | /transaction/details |    get transaction by id    |



## 💻 How To Install?
### Clone This Repo
```
git clone https://github.com/heatclift77/zwallet_api.git
```
### Go To Folder
```
cd zwallet_api
```
### install package
```
npm install
```
### Create env file

```
# ---------------------------------------
#               CONFIG DB
# ---------------------------------------
HOST=xxxx
user=xxxx
DBS=zwallet
DB_PASS=xxxx
# ---------------------------------------
#            CONFIG GENERAL
# ---------------------------------------
PORT=xxxx
SERVER=http://localhost:xxxx/v1/
APP=http://localhost:xxxx
PRIVATE_KEY=xxxxxxx
DIR_IMG=https:http://localhost:xxxx/img
```
Detail CONFIG GENERAL
| EXAMPLE URL | [http://localhost:5000]() |
| :-------------: |:-------------:|
| PORT | 5000 |
| HOST | [http://localhost]() |
##### development
```
npm run dev
```

## Documentation
https://documenter.getpostman.com/view/13883490/TzXxjxa2#536a3357-9985-4bdb-933d-26ba446724b5

## FrontEnd
Github : https://github.com/heatclift77/zwallet

## 💻 Live Demo
https://zwallet-heatclift77.vercel.app

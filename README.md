# cross

Учебный проект по курсу кроссплатформенной разработки 5 версий json редактора.

-----
Инструкция по запуску:
 
## 1-java
* javac -cp ./lib/javax.json-1.0.jar JsonEditor.java
* java -cp .:./lib/javax.json-1.0.jar JsonEditor

## 2-qt
* собирать в qt creator

## 3-electron
* yarn (OR npm) install 
* yarn (OR npm) start

## 4-python
* добавить библиотеку
* собирать в pycharm

## 5-react-native
* Использовать android studio
* Выкачать обязательные компоненты
* Установить sdk 29 (на данный момент: последня - 30, но rn не умеет ещё с ней работать)
* Установить эмулятор для 29 соответственно
* Убедиться в добавлении переменной окружения ANDROID_HOME
* yarn global add react-native
+ создание приложения: react-native init [имя]

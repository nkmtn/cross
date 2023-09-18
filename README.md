# cross

Educational project for the cross-platform development course. 5 versions of json editor.

-----
Running instructions:
 
## 1-java
* javac -cp ./lib/javax.json-1.0.jar JsonEditor.java
* java -cp .:./lib/javax.json-1.0.jar JsonEditor

## 2-qt
* just build it in QT Creator

## 3-electron
* yarn (OR npm) install 
* yarn (OR npm) start

## 4-python
* Add libs and build in PyCharm

## 5-react-native
* Use Android Studio
* Add all needed requirements
* Install sdk 29 (edit: when I studied this course it was reasonable, now I can try using more recent versions)
* Install emulator for 29 accordingly
* Make sure to add the ANDROID_HOME environment variable
* yarn global add react-native
+ creating an application: react-native init [name]

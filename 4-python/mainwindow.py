# This Python file uses the following encoding: utf-8
import sys
import json
from urllib import request, error

from PySide2.QtWidgets import QApplication, QMainWindow, QAction
from PySide2.QtWidgets import QInputDialog, QFileDialog
from PySide2.QtWidgets import QPlainTextEdit, QMessageBox


class MainWindow(QMainWindow):
    def __init__(self):
        QMainWindow.__init__(self)
        self.textEdit = QPlainTextEdit()
        self.initUI()

    def initUI(self):
        openAction = QAction('&Open...', self)
        openAction.setShortcut('Ctrl+O')
        openAction.setStatusTip('Open JSON file')
        openAction.triggered.connect(self.open)

        openLinkAction = QAction('&Open URL...', self)
        openLinkAction.setShortcut('Ctrl+L')
        openLinkAction.setStatusTip('Load JSON by URL')
        openLinkAction.triggered.connect(self.openLink)

        saveAction = QAction('&Save...', self)
        saveAction.setShortcut('Ctrl+S')
        saveAction.setStatusTip('Save JSON file')
        saveAction.triggered.connect(self.save)

        exitAction = QAction('&Quit', self)
        exitAction.setShortcut('Ctrl+Q')
        exitAction.setStatusTip('Exit application')
        exitAction.triggered.connect(self.close)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&File')
        fileMenu.addAction(openAction)
        fileMenu.addAction(openLinkAction)
        fileMenu.addAction(saveAction)
        fileMenu.addSeparator()
        fileMenu.addAction(exitAction)

        font = self.textEdit.font()
        font.setFamily("monospace")
        font.setPointSize(14)

        sb = self.textEdit.verticalScrollBar()
        sb.setValue(sb.maximum())

        self.setCentralWidget(self.textEdit)

        self.resize(800, 600)
        self.setWindowTitle("JSON Editor")
        self.show()

    def open(self):
        fname, _ = QFileDialog.getOpenFileName(self, 'Open JSON file', '/home')

        if fname == '':
            return

        f = open(fname, 'r')

        with f:
            data = f.read()
            self.textEdit.setPlainText(data)

    def openLink(self):
        url, ok = QInputDialog.getText(self, 'Load JSON by URL', 'Enter URL:')

        if not ok:
            return

        try:
            with request.urlopen(url) as f:
                data = f.read()
                self.textEdit.setPlainText(str(data, 'utf-8'))
        except (ValueError, error.URLError, error.HTTPError):
            msgBox = QMessageBox()
            msgBox.setText("Can't load JSON data")
            msgBox.exec_()

    def save(self):
        try:
            json.loads(self.textEdit.toPlainText())
        except json.JSONDecodeError:
            msgBox = QMessageBox()
            msgBox.setTitle("Error")
            msgBox.setText("Invalid JSON")
            msgBox.exec_()
            return

        fname, _ = QFileDialog.getSaveFileName(self, 'Save JSON to file')
        f = open(fname, "w")
        f.write(self.textEdit.toPlainText())
        f.close()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWindow()
    sys.exit(app.exec_())

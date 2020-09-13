#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_action_Open_triggered()
{
    QString fileName = QFileDialog::getOpenFileName(this,
                                                    "Выберите json файл",
                                                    QString(),
                                                    "JSON (*.json);;All Files (*);;");

    if (fileName.isEmpty())
        return;

    QFile f(fileName);
    if (!f.open(QFile::ReadOnly | QFile::Text)) {
        return;
    }

    QTextStream in(&f);
    ui->textEdit->setText(in.readAll());
    f.close();
}

void MainWindow::on_action_Save_triggered()
{
    QJsonDocument doc = QJsonDocument::fromJson(ui->textEdit->toPlainText().toUtf8());

    if (doc.isNull()) {
        QMessageBox errorMessageBox(this);
        errorMessageBox.setText(tr("Кривой JSON!"));
        errorMessageBox.setStandardButtons(QMessageBox::Ok);
        errorMessageBox.setDefaultButton(QMessageBox::Ok);
        errorMessageBox.setIcon(QMessageBox::Warning);
        errorMessageBox.setWindowTitle(tr("Error"));
        errorMessageBox.exec();
        return;
    }

    QString fileName = QFileDialog::getSaveFileName(this,
                                                    "Выберите файл для сохранения результата",
                                                    QString(),
                                                    QString(),
                                                    nullptr,
                                                    QFileDialog::DontConfirmOverwrite);

    QFile f(fileName);

    if (!f.open(QFile::WriteOnly)) {
        return;
    }

    QTextStream out(&f);
    out << ui->textEdit->toPlainText();
    f.close();
}

void MainWindow::on_action_Quit_triggered()
{
    QApplication::quit();
}

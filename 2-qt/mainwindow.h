#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QMessageBox>
#include <QFileDialog>
#include <QFile>
#include <QTextStream>
#include <QJsonDocument>
#include <QInputDialog>
#include <QDebug>
#include "filedownloader.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    FileDownloader* downloader;

private slots:
    void on_action_Open_triggered();
    void on_action_Save_triggered();
    void on_action_Quit_triggered();
    void on_action_OpenLink_triggered();
    void loadLink();
    void errLink();
};
#endif // MAINWINDOW_H

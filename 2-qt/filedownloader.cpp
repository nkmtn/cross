#include "filedownloader.h"

FileDownloader::FileDownloader(QUrl imageUrl, QObject *parent) :
 QObject(parent)
{
 connect(
  &m_WebCtrl, SIGNAL (finished(QNetworkReply*)),
  this, SLOT (fileDownloaded(QNetworkReply*))
  );

 QNetworkRequest request(imageUrl);
 m_WebCtrl.get(request);
}

FileDownloader::~FileDownloader() { }

void FileDownloader::fileDownloaded(QNetworkReply* pReply) {
    if (pReply->error() != QNetworkReply::NoError){
        emit error();
    }
 m_DownloadedData = pReply->readAll();
 //emit a signal
 pReply->deleteLater();
 emit downloaded();
}

QByteArray FileDownloader::downloadedData() const {
 return m_DownloadedData;
}

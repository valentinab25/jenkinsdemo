pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          script {
            try {
              git url: 'https://github.com/valentinab25/jenkinsdemo.git'
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4'''
              sh '''docker port $BUILD_TAG-test 8080/tcp > url.file;sed -i -e 's/0.0.0.0/dind/g' url.file'''
              sh '''new_url=$(cat url.file);timeout 300  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${new_url}/'''
              sh '''new_url=$(cat url.file);casperjs test casperjstests/test1.js --url=${new_url} --xunit=report.xml'''
            }
            finally {
              sh '''docker stop $BUILD_TAG-test'''
              sh '''docker rm -v $BUILD_TAG-test'''
            }
          }
          
          junit 'report.xml'
        }
        
      }
    }
  }
}
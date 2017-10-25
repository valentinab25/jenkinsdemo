pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          script {
            try {
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4;url=$(docker port $BUILD_TAG-test 8080/tcp);timeout 300  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${url/0.0.0.0/dind}/;'''
              sh '''url=$(docker port $BUILD_TAG-test 8080/tcp);casperjs test casperjstests/test1.js --url=${url/0.0.0.0/dind} --xunit=report.xml'''
            }
            finally {
              sh '''docker stop $BUILD_TAG-test'''
              sh '''docker rm -v $BUILD_TAG-test'''
            }
          }
          
        }
        
      }
    }
  }
}
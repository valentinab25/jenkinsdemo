pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          script {
            try {
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4;url=$(docker port $BUILD_TAG-test 8080/tcp);timeout 300  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${url}/;'''
              sh '''casperjs test casperjstests/test1.js --url=$(docker port $BUILD_TAG-test 8080/tcp) --xunit=report.xml'''
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
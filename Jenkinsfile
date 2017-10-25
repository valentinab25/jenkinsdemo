pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'swarm') {
          script {
            try {
              def wait_time = 300
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4;url=$(docker port $BUILD_TAG-test 8080/tcp);timeout $wait_time  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${url}/;'''
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
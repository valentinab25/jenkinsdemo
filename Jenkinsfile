pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          script {
            try {
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4;url=$(docker port $BUILD_TAG-test 8080/tcp);new_url=$(awk -v var="$url" 'BEGIN {split($var,a,":"); print a[1]}');timeout 300  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${new_url}/;'''
              sh '''url=$(docker port $BUILD_TAG-test 8080/tcp);new_url=$(awk -v var="$url" 'BEGIN {split($var,a,":"); print a[1]}');casperjs test casperjstests/test1.js --url=${new_url} --xunit=report.xml'''
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
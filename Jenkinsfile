pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          git(url: 'https://github.com/valentinab25/jenkinsdemo.git', branch: '${branch}', credentialsId: 'github', poll: true)
          script {
            try {
              sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test  plone:4;url=$(docker port $BUILD_TAG-test 8080/tcp);new_url=$(awk -v var="$url" 'BEGIN {split(var,a,":"); print "dind:"a[2]}');timeout 300  wget --retry-connrefused --tries=30 --waitretry=10 -q http://${new_url}/;'''
              sh '''ls;url=$(docker port $BUILD_TAG-test 8080/tcp);new_url=$(awk -v var="$url" 'BEGIN {split(var,a,":"); print "dind:"a[2]}');casperjs test casperjstests/test1.js --url=${new_url} --xunit=report.xml'''
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
pipeline {
  agent any
  stages {
    stage('Functional testing') {
      steps {
        node(label: 'docker-1.13') {
          script {
            try {   
            sh '''env'''
            git url:"$GIT_URL", branch:"$BRANCH_NAME"
            sh '''docker run -d -p 8080 -e ADDONS=eea.progressbar  --name=$BUILD_TAG-test eeacms/plone-test:4'''
            sh '''docker port $BUILD_TAG-test 8080/tcp > url.file;sed -i -e 's/0.0.0.0/172.21.0.1/g' url.file'''
            sh '''new_url=$(cat url.file);timeout 300  wget --retry-connrefused --tries=60 --waitretry=5 -q http://${new_url}/'''
            sh '''new_url=$(cat url.file);casperjs test jstests/*.js --url=${new_url} --xunit=report.xml'''
          }
          finally {
            sh '''docker stop $BUILD_TAG-test'''
            sh '''docker rm -v $BUILD_TAG-test'''
          }
        }
        
        junit 'report.xml'
        archiveArtifacts 'screenshot1.png'
      }
      
    }
  }
}
}

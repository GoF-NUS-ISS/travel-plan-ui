pipeline{
    agent { Dockerfile true }
  
  stages{
     stage('Checkout SCM'){
    
        echo 'Branch Name: $GIT_BRANCH'
    }
    
    stage('Docker Build'){
      steps {
        sh 'node --version'
        sh (script: 'docker images -a')
      }
    }
    
  }

}

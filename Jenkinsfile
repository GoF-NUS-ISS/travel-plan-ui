pipeline{
  agent any
  
  stages{
    
    stage('Verify Checkout Branch'){
      steps {
        echo 'Branch name: $GIT_CHECKOUT'
      }
    }
    
    stage('Docker Build'){
      steps {
        sh (script: 'docker images -a')
      }
    }
    
  }

}

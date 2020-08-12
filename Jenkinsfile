pipeline{
  agent any
  
  stages{
    
    stage('Verify Checkout Branch'){
      steps {
        echo 'Branch name: $GIT_CHECKOUT'
      }
    }
    
    stage('Verify Checkout Branch'){
      steps {
        sh (script: 'docker images -a')
      }
    }
    
    
  }

}

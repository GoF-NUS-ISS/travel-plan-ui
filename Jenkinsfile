pipeline{
    agent {
        docker { image 'node:14-alpine' }
    }
  
  stages{
    
    stage('Verify Checkout Branch'){
      steps {
        echo 'Branch name: $GIT_CHECKOUT'
      }
    }
    
    stage('Docker Build'){
      steps {
        sh 'node --version'
        sh (script: 'docker images -a')
      }
    }
    
  }

}

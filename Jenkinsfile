pipeline{
    agent any
  
  stages{
     stage('Checkout SCM'){
    	steps{
           echo "$GIT_BRANCH"
	}	
    }
    
    stage('Build Docker Image'){
      steps {
        sh (script: 'docker images -a')
	sh (script: 'docker build -t 333743/travel-plan-api:v1 .')
	sh (script: 'docker images -a')
      }
    }
    stage('Run App'){
      steps {
	sh (script: 'docker run -p 4200:4200 333743/travel-plan-api:v1')
      }
    }
    
  }

}

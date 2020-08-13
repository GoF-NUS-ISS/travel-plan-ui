pipeline{
    agent any
  
  stages{
     stage('Checkout SCM'){
    	steps{
           echo "$GIT_BRANCH"
	}	
    }
    
    stage('Docker Build'){
      steps {
        sh (script: 'docker images -a')
	sh (script: 'docker build -t 333743/travel-plan-api:v1 .')
	sh (script: 'docker images -a')
	sh (script: 'docker run -p 80:4200 333743/travel-plan-api:v1')
      }
    }
    
  }

}

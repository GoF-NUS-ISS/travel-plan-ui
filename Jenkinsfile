pipeline{
    agent any
  
  stages{
     stage('BranchName'){
    	steps{
           echo "$GIT_BRANCH"
	}	
    }
    
    stage('Build UI Docker Image'){
      steps {
	sh (script: 'docker build -t 333743/travel-plan-api:v1 .')
      }
    }
    stage('Run UI App'){
      steps {
	sh (script: 'docker stop $(docker ps -a -q)')
	sh (script: 'docker run -d -p 4200:4200 333743/travel-plan-api:v1')
	
      }
    }

    stage('Checkout Test Repo'){
      steps {
	git credentialsId: 'akt-id', url: 'https://github.com/GoF-NUS-ISS/travel-plan-qa.git'
      }
    }
    stage('Execute UI Tests'){
      steps {
	sh (script: 'yet to be written')
      }
    }
    
    stage('Build API Docker Image'){
      steps {
	sh (script: 'yet to be written')
      }
    }

    stage('Run API Tests'){
      steps {
	sh (script: 'yet to be written')
      }
    }
    stage('Run Integration Tests'){
      steps {
	sh (script: 'yet to be written')
      }
    }

}

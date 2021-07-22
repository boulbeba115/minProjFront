pipeline{
  agent any
  tools {
    nodejs "node"
    maven 'maven'
  }
  environment {
    REPO_URL= 'https://github.com/boulbeba115/minProjFront.git'
  }
  stages {
    stage ('SCM'){
      steps{
        git credentialsId: 'GIT-CREDENTIALS',
        url: REPO_URL
      }
    }
    stage ('Build'){
      steps{
        sh '''
        npm install 
        npm run build '''
      }
    }
    stage('zip artifact') {
            steps{
                script{
                    zip archive: true, dir: 'dist', glob: '',overwrite:true , zipFile: 'front-end.zip'
                }
            }
    }
    stage ('pulish nexus '){
        steps {
            script {
                def packageJSON = readJSON file: 'package.json'
                    def VERSION = packageJSON.version
                sh "mvn deploy:deploy-file -DgroupId=com.onegateafrica -DartifactId=FrontMiniProj -Dversion=${VERSION} -DgeneratePom=false -Dpackaging=zip -DrepositoryId=Front_MiniProj -Durl=http://admin:admin@host.docker.internal:8081/repository/frontEnd/ -Dfile=front-end.zip -X"
            }
        }
    }
    stage ('deploy'){
      steps{
        sh '''
        docker-compose down
        docker-compose build
        docker-compose up -d '''
      }
    }
  }
}

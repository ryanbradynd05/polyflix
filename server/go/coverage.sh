echo "Testing Code Coverage"
BASEDIR="$( cd "$( dirname "$0" )" && pwd )"

cd "${BASEDIR}/src/polyflix"
gocov test > ${BASEDIR}/coverage/polyflix.json
gocov-html -s ${BASEDIR}/coverage/coverage.css ${BASEDIR}/coverage/polyflix.json > ${BASEDIR}/coverage/coverage_report.html

cd "${BASEDIR}/src/polyflix/controllers"
gocov test > ${BASEDIR}/coverage/controllers.json
gocov-html -s ${BASEDIR}/coverage/coverage.css ${BASEDIR}/coverage/controllers.json >> ${BASEDIR}/coverage/coverage_report.html

cd "${BASEDIR}/src/polyflix/database"
gocov test > ${BASEDIR}/coverage/database.json
gocov-html -s ${BASEDIR}/coverage/coverage.css ${BASEDIR}/coverage/database.json >> ${BASEDIR}/coverage/coverage_report.html
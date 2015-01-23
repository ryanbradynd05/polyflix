echo "Testing Code Coverage"
BASEDIR="$( cd "$( dirname "$0" )" && pwd )"

cd "${BASEDIR}/src/polyflix"
gocov test > ${BASEDIR}/coverage/coverage.json
gocov-html ${BASEDIR}/coverage/coverage.json > ${BASEDIR}/coverage/coverage_report.html

cd "${BASEDIR}/src/polyflix/controllers"
gocov test > ${BASEDIR}/coverage/coverage.json
gocov-html ${BASEDIR}/coverage/coverage.json >> ${BASEDIR}/coverage/coverage_report.html

cd "${BASEDIR}/src/polyflix/database"
gocov test > ${BASEDIR}/coverage/coverage.json
gocov-html ${BASEDIR}/coverage/coverage.json >> ${BASEDIR}/coverage/coverage_report.html

# cd "${BASEDIR}/src/polyflix/models"
# gocov test >> ${BASEDIR}/coverage/coverage.json
# gocov-html ${BASEDIR}/coverage/coverage.json >> ${BASEDIR}/coverage/coverage_report.html
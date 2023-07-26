const app_name = 'arb-navigator-6c93ee5fc546'
exports.buildPath =
function buildPath(route)
{
if (process.env.NODE_ENV === 'production')
{
return 'https://' + app_name + '.herokuapp.com/' + route;
}
else
{
return 'http://localhost:5000/' + route;
}
}

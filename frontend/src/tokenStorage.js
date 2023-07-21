exports.storeToken = function ( tok )
{
    try
    {
        console.log(tok.accessToken);
        localStorage.setItem('token_data', tok.accessToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
}
exports.retrieveToken = function ()
    {
        var ud;
        try
            {
                console.log("hi");
                ud = localStorage.getItem('token_data');
            }               
        catch(e)
            {
                console.log(e.message);
            }
    return ud;
    }
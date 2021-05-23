using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Framework.DB
{
    /// <summary>
    /// Summary description for DBQuerysResponse
    /// </summary>
    public class DBQueryResponse
    {

        public DBQueryResponse(){}

        /// <summary>
        /// CheckIntegerResponse
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static bool CheckInteger(string response)
        {
            bool isOK = true;
            int value;
            isOK = Int32.TryParse(response, out value);
            return isOK;
        }

        /// <summary>
        /// CheckIntegerResponse
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static bool CheckPositiveInteger(string response)
        {            
            int value;
            int.TryParse(response, out value);
            if (value > 0)
                return true;
            else
                return false;
        }

        /// <summary>
        /// CheckBoolResponse
        /// </summary>
        /// <param name="response"></param>
        /// <returns></returns>
        public static bool CheckBool(string response)
        {
            bool isOK = true;
            bool value;
            isOK = Boolean.TryParse(response, out value);
            return isOK;
        }


    }
}
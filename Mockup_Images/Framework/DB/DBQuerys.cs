using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Framework.DB
{

    public class DBResponseWithMessage
    {
        public bool IsScalar = true;
        public bool IsNonQuery = true;
        public bool IsReaderDataTable = false; 

        public string Response = "";
        public string ResponseMessage = "";
        public DataTable ResponseTable = null;
    }

    public class DBQuerys
    {

        private static string GetConnectionString()
        {
            //return (VisionControl.Properties.Settings.Default.InDevelopment == true ?
            //                                        VisionControl.Properties.Settings.Default.ConnectionString :
            //                                        null);
            return "";

            //ConnectionStringSettings mySetting = ConfigurationManager.ConnectionStrings["test"];
            //if (mySetting == null || string.IsNullOrEmpty(mySetting.ConnectionString))
            //    throw new Exception("Fatal error: missing connecting string in web.config file");
        }

             
        /// <summary>
        /// ExecuteReaderDataTable
        /// </summary>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static DataTable ExecuteReaderDataTable(SqlCommand cmd)
        {
            SqlConnection conn = null;
            DataTable dt = new DataTable();
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;
                cmd.CommandTimeout = cmd.Connection.ConnectionTimeout;
                dt.Load(cmd.ExecuteReader());
                conn.Close();
            }
            catch (Exception ex)
            {             
                //MessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine+ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            finally
            {
                if (conn != null && conn.State != ConnectionState.Closed)
                    conn.Close();
            }
            return dt;
        }


        /// <summary>
        /// ExecuteReaderDataTableWithResponseAndMessage
        /// </summary>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static DBResponseWithMessage ExecuteReaderDataTableWithResponseAndMessage(SqlCommand cmd)
        {
            SqlConnection conn = null;
            DataTable dt = new DataTable();
            string response = "-1";
            string responseMessage = "";
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;
                cmd.CommandTimeout = cmd.Connection.ConnectionTimeout;

                SqlParameter paramOut = new SqlParameter("@Response", SqlDbType.VarChar, 50);
                paramOut.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(paramOut);

                SqlParameter paramMessage = new SqlParameter("@ResponseMessage", SqlDbType.VarChar, 500);
                paramMessage.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(paramMessage);

                dt.Load(cmd.ExecuteReader());
                response = cmd.Parameters["@Response"].Value.ToString();
                responseMessage = cmd.Parameters["@ResponseMessage"].Value.ToString().Trim();


            }            
            catch (Exception ex)
            {
                //XtraMessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine + ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);

            }
            finally
            {
                if (conn != null && conn.State != ConnectionState.Closed)
                    conn.Close();
                //Cursor.Current = Cursors.Default;
            }


            DBResponseWithMessage responseWithMessage = new DBResponseWithMessage();
            responseWithMessage.Response = response;
            responseWithMessage.ResponseMessage = responseMessage;
            responseWithMessage.ResponseTable = dt;
            responseWithMessage.IsReaderDataTable = true;
            return responseWithMessage;
        }


        /// <summary>
        /// ExecuteReaderDataSet
        /// </summary>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static DataSet ExecuteReaderDataSet(SqlCommand cmd)
        {
            DataSet ds = new DataSet();
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;
                cmd.CommandTimeout = cmd.Connection.ConnectionTimeout;

                using (SqlDataAdapter adapter = new SqlDataAdapter())
                {
                    adapter.SelectCommand = cmd;
                    adapter.Fill(ds);
                }              
            }
            catch (Exception ex)
            {

                //XtraMessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine + ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            finally
            {
                if (conn != null && conn.State != ConnectionState.Closed)
                    conn.Close();
            }
            return ds;
        }

        
        /// <summary>
        /// ExecuteScalar
        /// </summary>
        /// <returns></returns>
        public static string ExecuteScalar(SqlCommand cmd)
        {
            SqlConnection conn = null;
            string response = "-1";
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;
                cmd.CommandTimeout = cmd.Connection.ConnectionTimeout;
                SqlParameter paramOut = new SqlParameter("@Response", SqlDbType.VarChar, 50);
                paramOut.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(paramOut);

                DataTable dt = new DataTable();
                cmd.ExecuteScalar();                
            
                response=cmd.Parameters["@Response"].Value.ToString();
             }
            catch (Exception ex)
            {
                //XtraMessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine + ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            finally
            {
                if(conn!=null && conn.State!=ConnectionState.Closed)
                    conn.Close();
            }

            return response;
        }

        /// <summary>
        /// ExecuteScalarWithMessage
        /// </summary>
        /// <returns></returns>
        public static DBResponseWithMessage ExecuteScalarWithMessage(SqlCommand cmd)
        {
            SqlConnection conn = null;
            string response = "-1";
            string responseMessage = "";
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;
                cmd.CommandTimeout = cmd.Connection.ConnectionTimeout;
                SqlParameter paramOut = new SqlParameter("@Response", SqlDbType.VarChar, 50);
                paramOut.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(paramOut);

                SqlParameter paramMessage = new SqlParameter("@ResponseMessage", SqlDbType.VarChar, 250);
                paramMessage.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(paramMessage);
                cmd.ExecuteScalar();

                response = cmd.Parameters["@Response"].Value.ToString();
                responseMessage = cmd.Parameters["@ResponseMessage"].Value.ToString().Trim();
            }
            catch (Exception ex)
            {
                //XtraMessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine + ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            finally
            {
                if (conn != null && conn.State != ConnectionState.Closed)
                    conn.Close();
            }

            DBResponseWithMessage responseWithMessage = new DBResponseWithMessage();
            responseWithMessage.Response = response;
            responseWithMessage.ResponseMessage = responseMessage;
            responseWithMessage.IsScalar = true;
            return responseWithMessage;
        }


        /// <summary>
        /// ExecuteNonQuery
        /// </summary>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static void ExecuteNonQuery(SqlCommand cmd)
        {
            SqlConnection conn = null;
            try
            {
                conn = new SqlConnection(GetConnectionString());
                conn.Open();
                cmd.Connection = conn;

                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {

                //XtraMessageBox.Show("Neconcordanta executare operatiune." + Environment.NewLine + ex.Message + " / " + ex.StackTrace, "Neconcordanta", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            finally
            {
                if (conn != null && conn.State != ConnectionState.Closed)
                    conn.Close();
            }
        }
    }
}

/*
 cmd = new SqlCommand();
cmd.CommandType = CommandType.StoredProcedure;
cmd.CommandText = "TRACEABILITY_CheckpointVision_GetPOFromBarcode";
cmd.Parameters.AddWithValue("@SAPProductionOrderBarcode", txtBoxPO.Text.Trim());
cmd.Parameters.AddWithValue("@User_ID", User.ID);
DBResponseWithMessage response = DBQuerys.ExecuteReaderDataTableWithResponseAndMessage(cmd);
if (!DBQueryResponse.CheckPositiveInteger(response.Response))
{
    XtraMessageBoxCustom.Show("Neconcordanta executare operatiune." + Environment.NewLine + response.ResponseMessage, "Neconcordanta - GetPOFromBarcode(1)", MessageBoxButtons.OK, MessageBoxIcon.Warning);
    FocusTextBox(txtBoxPO);
    return;
}

if (response.ResponseTable.ExtCheckIsEmpty())
{
    XtraMessageBoxCustom.Show("Neconcordanta identificare PO.", "Neconcordanta - GetPOFromBarcode (2)", MessageBoxButtons.OK, MessageBoxIcon.Warning);
    FocusTextBox(txtBoxPO);
    return;
}
 */
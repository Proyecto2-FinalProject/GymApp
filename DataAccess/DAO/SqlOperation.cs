﻿using System.Collections.Generic;
using System.Data.SqlClient;

namespace DataAccess.Dao
{
    public class SqlOperation
    {
        public string ProcedureName { get; set; }
        public List<SqlParameter> parameters;

        public SqlOperation()
        {
            parameters = new List<SqlParameter>();
        }

        public void AddVarcharParam(string parameterName, string paramValue)
        {
            parameters.Add(new SqlParameter("@" + parameterName, paramValue));
        }

        public void AddIntegerParam(string parameterName, int paramValue)
        {
            parameters.Add(new SqlParameter("@" + parameterName, paramValue));
        }

        public void AddDateTimeParam(string parameterName, DateTime paramValue)
        {
            parameters.Add(new SqlParameter("@" + parameterName, paramValue));
        }

        public void AddTimeSpanParam(string parameterName, TimeSpan paramValue)
        {
            parameters.Add(new SqlParameter("@" + parameterName, paramValue));
        }

        public void AddDecimalParam(string parameterName, Decimal paramValue)
        {
            parameters.Add(new SqlParameter("@" + parameterName, paramValue));
        }
    }
}
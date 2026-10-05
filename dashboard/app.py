import streamlit as st

st.title("🔐 Sentinel Shield Dashboard")

st.metric("Requests/sec", "120")
st.metric("Blocked Requests", "15")

st.write("⚠️ 192.168.1.5 - Exceeded Login Limit")
st.write("🚫 SQL Injection Blocked from 192.168.1.8")
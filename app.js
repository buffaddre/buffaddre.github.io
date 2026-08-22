const API_BASE = "https://YOUR-VERCEL-DOMAIN.vercel.app";
const PRICE_PER_UNIT = 500; // 500đ / 100 Add Fr => đổi theo giá của bạn

const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat("vi-VN").format(n) + "đ";
const getOrders = () => JSON.parse(localStorage.getItem("addfr_orders") || "[]");
const saveOrders = x => localStorage.setItem("addfr_orders", JSON.stringify(x));

function openOrder(){ $("#orderModal").classList.add("show"); updateTotal(); }
function closeOrder(){ $("#orderModal").classList.remove("show"); }
function scrollToOrders(){ $("#orders").scrollIntoView({behavior:"smooth"}); }
function updateTotal(){ const q=Number($("#quantity").value||0); $("#total").textContent=money(Math.ceil(q/100)*PRICE_PER_UNIT); }
$("#quantity").addEventListener("input",updateTotal);

function statusLabel(s){
  return ({processing:"Đang xử lý",approved:"Đã phê duyệt",running:"Đang tiến hành chạy",completed:"Đã hoàn thành"})[s] || "Đang xử lý";
}
const steps=[["processing","Đang xử lý"],["approved","Đã phê duyệt"],["running","Đang tiến hành chạy"],["completed","Đã hoàn thành"]];
function renderOrders(){
  const list=$("#ordersList"), orders=getOrders();
  if(!orders.length){list.className="orders-empty";list.textContent="Chưa có đơn hàng trên thiết bị này.";return}
  list.className="";
  list.innerHTML=orders.map(o=>{
    const idx=steps.findIndex(x=>x[0]===o.status);
    return `<div class="order-card"><div class="order-top"><div><div class="order-id">${o.id}</div><div style="color:#777;font-size:12px;margin-top:6px">${o.quantity} Add Fr · ${money(o.total)}</div></div><span class="status">${statusLabel(o.status)}</span></div><div class="timeline">${steps.map((s,i)=>`<div class="step ${i<=idx?"active":""}"><div class="step-dot"></div>${s[1]}</div>`).join("")}</div></div>`
  }).join("");
}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),3000)}

$("#orderForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const quantity=Number($("#quantity").value), total=Math.ceil(quantity/100)*PRICE_PER_UNIT;
  const order={quantity,target:$("#target").value.trim(),customer:$("#customer").value.trim(),phone:$("#phone").value.trim(),total};
  try{
    const r=await fetch(API_BASE+"/api/create-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||"Không tạo được đơn");
    const orders=getOrders(); orders.unshift({...order,id:data.orderId,status:"processing"}); saveOrders(orders);
    closeOrder(); renderOrders(); toast("Đặt hàng thành công: "+data.orderId); scrollToOrders();
  }catch(err){toast("Lỗi: "+err.message)}
});
renderOrders();

<?php
require_once 'db.php';

// دریافت اطلاعات ارسال شده از سمت ریکت (فرمت JSON)
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->customer_name) && !empty($data->customer_phone) && !empty($data->cart_items)) {
    try {
        // شروع تراکنش (Transaction)
        $conn->beginTransaction();

        // ۱. ثبت اطلاعات کلی سفارش
        $query = "INSERT INTO orders (customer_name, customer_phone, customer_address, total_price) 
                  VALUES (:name, :phone, :address, :total)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $data->customer_name);
        $stmt->bindParam(":phone", $data->customer_phone);
        $stmt->bindParam(":address", $data->customer_address);
        $stmt->bindParam(":total", $data->total_price);
        $stmt->execute();
        
        $order_id = $conn->lastInsertId(); // دریافت آیدی سفارشی که الان ثبت شد

        // ۲. ثبت آیتم‌های سبد خرید در جدول order_items
        $item_query = "INSERT INTO order_items (order_id, product_id, quantity, price) 
                       VALUES (:order_id, :product_id, :quantity, :price)";
        $item_stmt = $conn->prepare($item_query);

        foreach ($data->cart_items as $item) {
            $item_stmt->bindParam(":order_id", $order_id);
            $item_stmt->bindParam(":product_id", $item->id);
            $item_stmt->bindParam(":quantity", $item->quantity);
            
            // محاسبه قیمت نهایی با در نظر گرفتن تخفیف
            $discount = isset($item->off) ? $item->off : 0;
            $final_price = $item->price - ($item->price * $discount / 100);
            
            $item_stmt->bindParam(":price", $final_price);
            $item_stmt->execute();
        }

        // تایید تراکنش
        $conn->commit();
        echo json_encode(["success" => true, "message" => "سفارش با موفقیت ثبت شد", "order_id" => $order_id]);
        
    } catch (Exception $e) {
        // در صورت بروز خطا، هیچ دیتایی ثبت نمی‌شود
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "خطا در ثبت سفارش: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "اطلاعات سفارش ناقص است."]);
}
?>

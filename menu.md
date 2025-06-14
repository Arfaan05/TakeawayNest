<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant Inventory Management</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #ff6b6b, #ffa500);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .controls {
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }

        .controls-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .search-box {
            position: relative;
            flex: 1;
            max-width: 400px;
        }

        .search-box input {
            width: 100%;
            padding: 12px 45px 12px 20px;
            border: 2px solid #e9ecef;
            border-radius: 50px;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .search-box input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #6c757d;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-success {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
        }

        .btn-danger {
            background: linear-gradient(135deg, #dc3545, #fd7e14);
            color: white;
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-edit {
            background: linear-gradient(135deg, #ffc107, #fd7e14);
            color: white;
            padding: 8px 16px;
            font-size: 14px;
        }

        .inventory-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .inventory-table th {
            background: linear-gradient(135deg, #343a40, #495057);
            color: white;
            padding: 20px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .inventory-table td {
            padding: 20px 15px;
            border-bottom: 1px solid #e9ecef;
            vertical-align: middle;
        }

        .inventory-table tr:hover {
            background: #f8f9fa;
        }

        .item-image {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .item-name {
            font-weight: 600;
            color: #343a40;
            font-size: 16px;
        }

        .item-price {
            font-size: 18px;
            font-weight: 700;
            color: #28a745;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quantity-btn {
            width: 35px;
            height: 35px;
            border: none;
            border-radius: 50%;
            background: #667eea;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .quantity-btn:hover {
            background: #5a6fd8;
            transform: scale(1.1);
        }

        .quantity-display {
            min-width: 50px;
            text-align: center;
            font-weight: 600;
            font-size: 16px;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 8px;
        }

        .stock-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .stock-in {
            background: #d4edda;
            color: #155724;
        }

        .stock-low {
            background: #fff3cd;
            color: #856404;
        }

        .stock-out {
            background: #f8d7da;
            color: #721c24;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .modal-header h2 {
            color: #343a40;
            font-size: 1.8rem;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6c757d;
            padding: 5px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #343a40;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 30px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
            background: #f8f9fa;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #667eea;
        }

        .stat-label {
            color: #6c757d;
            font-weight: 600;
            margin-top: 10px;
        }

        @media (max-width: 768px) {
            .controls-row {
                flex-direction: column;
                align-items: stretch;
            }

            .search-box {
                max-width: none;
            }

            .inventory-table {
                font-size: 14px;
            }

            .inventory-table th,
            .inventory-table td {
                padding: 10px 8px;
            }

            .modal-content {
                padding: 20px;
                margin: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍽️ Restaurant Inventory</h1>
            <p>Manage your menu items and track inventory levels</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number" id="totalItems">0</div>
                <div class="stat-label">Total Items</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="lowStock">0</div>
                <div class="stat-label">Low Stock</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="outOfStock">0</div>
                <div class="stat-label">Out of Stock</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="totalValue">$0</div>
                <div class="stat-label">Total Value</div>
            </div>
        </div>

        <div class="controls">
            <div class="controls-row">
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Search items...">
                    <span class="search-icon">🔍</span>
                </div>
                <button class="btn btn-primary" onclick="openAddModal()">
                    ➕ Add New Item
                </button>
            </div>
        </div>

        <div style="overflow-x: auto;">
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="inventoryTableBody">
                    <!-- Items will be populated here -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Add/Edit Modal -->
    <div id="itemModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Add New Item</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form id="itemForm">
                <div class="form-group">
                    <label for="itemName">Item Name *</label>
                    <input type="text" id="itemName" required>
                </div>
                <div class="form-group">
                    <label for="itemPrice">Price ($) *</label>
                    <input type="number" id="itemPrice" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label for="itemQuantity">Quantity *</label>
                    <input type="number" id="itemQuantity" min="0" required>
                </div>
                <div class="form-group">
                    <label for="itemImage">Image URL</label>
                    <input type="url" id="itemImage" placeholder="https://example.com/image.jpg">
                </div>
                <div class="form-group">
                    <label for="itemUrl">Menu URL</label>
                    <input type="text" id="itemUrl" placeholder="/menu/item-name">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-success">💾 Save Item</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let inventory = [
            {
                id: 1,
                name: "Margherita Pizza",
                price: 16.99,
                quantity: 25,
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=200&fit=crop",
                url: "/menu/margherita-pizza"
            },
            {
                id: 2,
                name: "Caesar Salad",
                price: 12.50,
                quantity: 4,
                image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop",
                url: "/menu/caesar-salad"
            },
            {
                id: 3,
                name: "Grilled Salmon",
                price: 24.99,
                quantity: 0,
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
                url: "/menu/grilled-salmon"
            },
            {
                id: 4,
                name: "Beef Tacos",
                price: 14.99,
                quantity: 18,
                image: "https://images.unsplash.com/photo-1565299585323-38174c75daa8?w=300&h=200&fit=crop",
                url: "/menu/beef-tacos"
            }
        ];

        let editingItemId = null;

        function renderInventory() {
            const tbody = document.getElementById('inventoryTableBody');
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            const filteredInventory = inventory.filter(item => 
                item.name.toLowerCase().includes(searchTerm)
            );

            tbody.innerHTML = filteredInventory.map(item => `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" class="item-image" 
                             onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop'">
                    </td>
                    <td class="item-name">${item.name}</td>
                    <td class="item-price">$${item.price.toFixed(2)}</td>
                    <td>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </td>
                    <td>
                        <span class="stock-badge ${getStockClass(item.quantity)}">
                            ${getStockStatus(item.quantity)}
                        </span>
                    </td>
                    <td>
                        <a href="${item.url}" target="_blank" style="color: #667eea; text-decoration: none;">
                            ${item.url}
                        </a>
                    </td>
                    <td>
                        <button class="btn btn-edit" onclick="editItem(${item.id})">
                            ✏️ Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteItem(${item.id})" style="margin-left: 10px;">
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            `).join('');

            updateStats();
        }

        function getStockStatus(quantity) {
            if (quantity === 0) return 'Out of Stock';
            if (quantity <= 5) return 'Low Stock';
            return 'In Stock';
        }

        function getStockClass(quantity) {
            if (quantity === 0) return 'stock-out';
            if (quantity <= 5) return 'stock-low';
            return 'stock-in';
        }

        function updateStats() {
            const totalItems = inventory.length;
            const lowStock = inventory.filter(item => item.quantity > 0 && item.quantity <= 5).length;
            const outOfStock = inventory.filter(item => item.quantity === 0).length;
            const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('lowStock').textContent = lowStock;
            document.getElementById('outOfStock').textContent = outOfStock;
            document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
        }

        function updateQuantity(id, change) {
            const item = inventory.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(0, item.quantity + change);
                renderInventory();
            }
        }

        function deleteItem(id) {
            if (confirm('Are you sure you want to delete this item?')) {
                inventory = inventory.filter(item => item.id !== id);
                renderInventory();
            }
        }

        function openAddModal() {
            editingItemId = null;
            document.getElementById('modalTitle').textContent = 'Add New Item';
            document.getElementById('itemForm').reset();
            document.getElementById('itemModal').style.display = 'block';
        }

        function editItem(id) {
            const item = inventory.find(item => item.id === id);
            if (item) {
                editingItemId = id;
                document.getElementById('modalTitle').textContent = 'Edit Item';
                document.getElementById('itemName').value = item.name;
                document.getElementById('itemPrice').value = item.price;
                document.getElementById('itemQuantity').value = item.quantity;
                document.getElementById('itemImage').value = item.image;
                document.getElementById('itemUrl').value = item.url;
                document.getElementById('itemModal').style.display = 'block';
            }
        }

        function closeModal() {
            document.getElementById('itemModal').style.display = 'none';
            editingItemId = null;
        }

        document.getElementById('itemForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('itemName').value;
            const price = parseFloat(document.getElementById('itemPrice').value);
            const quantity = parseInt(document.getElementById('itemQuantity').value);
            const image = document.getElementById('itemImage').value || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop';
            const url = document.getElementById('itemUrl').value || `/menu/${name.toLowerCase().replace(/\s+/g, '-')}`;

            if (editingItemId) {
                // Edit existing item
                const item = inventory.find(item => item.id === editingItemId);
                if (item) {
                    item.name = name;
                    item.price = price;
                    item.quantity = quantity;
                    item.image = image;
                    item.url = url;
                }
            } else {
                // Add new item
                const newItem = {
                    id: Date.now(),
                    name,
                    price,
                    quantity,
                    image,
                    url
                };
                inventory.push(newItem);
            }

            closeModal();
            renderInventory();
        });

        document.getElementById('searchInput').addEventListener('input', renderInventory);

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('itemModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        // Initial render
        renderInventory();
    </script>
</body>
</html>
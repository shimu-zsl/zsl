// 独立背景解决方案
(function() {
    console.log("=== 启动独立背景解决方案 ===");
    
    // 在页面加载完成后运行
    window.addEventListener('DOMContentLoaded', function() {
        // 1. 移除所有可能存在的背景
        const existingBg = document.querySelector('.background-slideshow');
        if (existingBg) {
            existingBg.parentNode.removeChild(existingBg);
            console.log("移除了现有背景");
        }
        
        // 2. 创建新的背景容器
        const bgContainer = document.createElement('div');
        bgContainer.id = 'new-background';
        bgContainer.style.position = 'fixed';
        bgContainer.style.top = '0';
        bgContainer.style.left = '0';
        bgContainer.style.width = '100%';
        bgContainer.style.height = '100%';
        bgContainer.style.zIndex = '-999'; // 确保在所有内容之下
        
        // 3. 确保body没有背景
        document.body.style.background = 'none';
        
        // 4. 将背景容器插入到body的第一个元素位置
        document.body.insertBefore(bgContainer, document.body.firstChild);
        console.log("创建了新的背景容器");
        
        // 5. 背景图片URLs - 使用在线图片以避免路径问题
        const images = [
            'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg',
            'https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg',
            'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg',
            'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
            'https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg',
            'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg',
            'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg',
            'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg',
            'https://images.pexels.com/photos/1834399/pexels-photo-1834399.jpeg'
        ];
        
        // 6. 创建幻灯片元素
        const slides = [];
        
        images.forEach((imgUrl, index) => {
            // 创建新幻灯片
            const slide = document.createElement('div');
            slide.className = 'new-slide';
            
            // 设置样式
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.backgroundImage = `url(${imgUrl})`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = 'opacity 1.5s ease-in-out';
            
            // 添加到容器
            bgContainer.appendChild(slide);
            slides.push(slide);
            
            // 预加载图片以确保正常显示
            const img = new Image();
            img.src = imgUrl;
            
            console.log(`创建了幻灯片 ${index+1} 使用图片: ${imgUrl}`);
        });
        
        // 7. 添加半透明遮罩
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        overlay.style.zIndex = '1';
        
        bgContainer.appendChild(overlay);
        console.log("添加了半透明遮罩层");
        
        // 8. 轮播逻辑
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].style.opacity = '0';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.opacity = '1';
            
            console.log(`切换到幻灯片 ${currentSlide+1}`);
        }
        
        // 9. 添加控制按钮（方便调试）
        const controls = document.createElement('div');
        controls.style.position = 'fixed';
        controls.style.bottom = '20px';
        controls.style.right = '20px';
        controls.style.zIndex = '1000';
        controls.style.backgroundColor = 'rgba(0,0,0,0.5)';
        controls.style.padding = '10px';
        controls.style.borderRadius = '5px';
        
        const label = document.createElement('span');
        label.textContent = '背景控制: ';
        label.style.color = 'white';
        label.style.marginRight = '10px';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '上一张';
        prevBtn.style.marginRight = '10px';
        prevBtn.style.padding = '5px 10px';
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '下一张';
        nextBtn.style.padding = '5px 10px';
        
        controls.appendChild(label);
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        document.body.appendChild(controls);
        
        // 按钮事件
        prevBtn.addEventListener('click', function() {
            slides[currentSlide].style.opacity = '0';
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].style.opacity = '1';
            
            console.log(`手动切换到幻灯片 ${currentSlide+1}`);
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
        
        // 10. 确保所有容器有正确的z-index
        document.querySelectorAll('.container, section, header, footer').forEach(el => {
            const currentZIndex = window.getComputedStyle(el).zIndex;
            if (currentZIndex === 'auto' || parseInt(currentZIndex) < 1) {
                el.style.position = 'relative';
                el.style.zIndex = '1';
            }
        });
        
        // 11. 设置自动轮播 (2.5秒切换一次)
        setInterval(nextSlide, 2500);
        
        console.log("背景轮播设置完成!");
    });
})();

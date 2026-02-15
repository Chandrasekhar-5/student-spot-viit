document.addEventListener('DOMContentLoaded', function() {
    
    const animateElements = document.querySelectorAll('.animate');
    
    
    animateElements.forEach(el => {
        if (el.classList.contains('show')) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Optionally remove class when out of view
                 entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    
    animateElements.forEach(el => observer.observe(el));

    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    
    function validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        
        formElement.querySelectorAll('.error-text').forEach(el => el.remove());
        
        inputs.forEach(input => {
            input.style.borderColor = '#e5e7eb';
            
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
                
                const errorMsg = document.createElement('small');
                errorMsg.className = 'error-text';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginTop = '5px';
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'This field is required';
                
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        });
        
        return isValid;
    }

    function showSuccessMessage(message) {
        document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #10b981;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            z-index: 2000;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => successDiv.remove(), 500);
        }, 3000);
    }

    function showErrorMessage(message) {
        document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #ef4444;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            z-index: 2000;
            animation: slideInRight 0.5s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => errorDiv.remove(), 500);
        }, 3000);
    }

    function showLoading(element) {
        const originalText = element.textContent;
        const originalWidth = element.offsetWidth;
        element.style.width = originalWidth + 'px';
        element.disabled = true;
        element.innerHTML = '<span class="loading"></span> Loading...';
        
        return function() {
            element.disabled = false;
            element.style.width = 'auto';
            element.textContent = originalText;
        };
    }


    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const removeLoading = showLoading(submitBtn);
                
                setTimeout(() => {
                    removeLoading();
                    showSuccessMessage('Form submitted successfully!');
                    this.reset();
                }, 1500);
            }
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid #ffffff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});
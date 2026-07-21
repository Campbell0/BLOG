---
title: Spring 框架中 IoC 的三种依赖注入方式
slug: 2026-07-22-spring-ioc
description: 分析 Spring 框架中字段注入、Setter 注入和构造器注入的区别、优缺点与适用场景。
pubDate: 2026-07-22
updatedDate: 2026-07-22
tags:
  - Java
  - Spring
featured: false
---

IoC 是 Spring 的核心思想之一，而依赖注入是 Spring 实现 IoC 的主要方式。在基于注解的项目中，常见的注入位置包括字段、Setter 方法和构造器。

三种方式都能完成依赖注入，但它们表达的设计含义不同。一般情况下，必需依赖使用构造器注入，可选依赖使用 Setter 注入，字段注入则尽量只用于简单演示。

## 字段注入

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser() {
        userRepository.save();
    }
}
```

使用字段注入时，Spring 会先调用构造器完成 Bean 的实例化，再通过反射为标有 `@Autowired` 的字段注入依赖。

字段依赖无法通过构造阶段保证对象完整。如果脱离 Spring 容器直接创建对象，或者在构造器中使用尚未注入的字段，就可能出现空指针。测试时也无法直接传入依赖，通常需要启动 Spring 容器或借助反射。

字段注入的优点是代码简短，适合 Demo 和简单示例；缺点是依赖关系容易被隐藏，也不利于单元测试。

## Setter 注入

```java
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

Setter 注入和字段注入都发生在对象实例化之后。不同之处在于，Setter 注入通过方法传入依赖，而不是由 Spring 直接修改字段。

Setter 方法可以在普通代码和单元测试中直接调用，也可以对参数进行校验。它还允许依赖在对象创建后被重新设置，因此更适合真正可选或需要重新配置的依赖。不过，这也意味着依赖可能被意外替换，并且对象在 Setter 调用前仍可能处于不完整状态。

可选依赖可以写成：

```java
@Autowired(required = false)
public void setNotificationService(NotificationService notificationService) {
    this.notificationService = notificationService;
}
```

当容器中没有 `NotificationService` 时，Spring 不会调用这个方法。业务代码仍然需要处理依赖不存在的情况，否则使用它时依旧可能出现空指针。

## 构造器注入

构造器注入是 Spring 推荐的依赖注入方式。它的核心思想是：**对象在创建时就必须获得它运行所需要的依赖，只有依赖满足后，对象才能被创建成功。**

当类只有一个构造器时，Spring 会默认将该构造器作为依赖注入入口，不需要额外添加 `@Autowired`：

```java
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

Spring 会先从 IoC 容器中查找 `UserRepository` Bean，然后调用构造器创建 `UserService`：

```java
new UserService(userRepository);
```

因此，`UserService` 实例创建完成后，它所依赖的 `UserRepository` 一定已经存在，不会出现对象已经创建但依赖尚未注入的中间状态。

由于依赖是在构造阶段完成初始化，因此可以将依赖字段声明为 `final`：

```java
private final UserRepository userRepository;
```

这样可以保证依赖只会在对象创建时赋值，创建完成后不能被重新修改。

---

当一个类存在多个构造器时，Spring 无法判断哪个构造器代表对象创建所需的依赖，因此需要通过 `@Autowired` 明确指定：

```java
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.productRepository = null;
    }


    @Autowired
    public UserService(
            UserRepository userRepository,
            ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
}
```

通过 `@Autowired`，Spring 可以明确知道应该调用：

```java
new UserService(userRepository, productRepository);
```

而不是其他构造器。

## 字段注入和 Setter 注入会使用哪个构造器

字段注入和 Setter 注入不会决定 Spring 使用哪个构造器。Spring 会先按照构造器选择规则创建对象，再执行字段或 Setter 注入：

1. 没有显式声明构造器时，使用 Java 自动生成的无参构造器；
2. 只有一个构造器时，直接使用该构造器，不需要 `@Autowired`；
3. 有多个构造器时，优先使用标有 `@Autowired` 的构造器；
4. 有多个构造器但没有标注时，如果存在默认构造器，Spring 可以使用默认构造器；否则可能因为无法确定构造器而创建 Bean 失败。

因此，一个类完全可能先通过有参构造器接收必需依赖，再通过字段或 Setter 接收其他依赖。这属于混合使用多种注入方式。

## 三种方式对比

| 方式 | 依赖关系 | 支持 `final` | 单元测试 | 适合场景 |
| --- | --- | --- | --- | --- |
| 字段注入 | 容易隐藏 | 否 | 不方便 | Demo、旧代码 |
| Setter 注入 | 较明确 | 否 | 较方便 | 可选、可替换依赖 |
| 构造器注入 | 明确 | 是 | 最方便 | 必需依赖、默认选择 |

## 参考资料

- [Spring Framework：Dependency Injection](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
- [Spring Framework：Using `@Autowired`](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired.html)

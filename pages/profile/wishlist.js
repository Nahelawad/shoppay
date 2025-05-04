import Layout from "../../components/profile/layout";
import { getSession } from "next-auth/react";
import User from "../../models/User";
import styles from "../../styles/profile.module.scss";

export default function Wishlist({ user, tab, wishlist }) {
    return (
        <Layout session={user.user} tab={tab}>
            <div className={styles.orders}>
                <div className={styles.header}>
                    <h2>YOUR WISHLIST</h2>
                </div>
                {wishlist.length === 0 ? (
                    <p>No items in wishlist.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Category</td>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map((item) => (
                                <tr key={item.product._id}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const { query, req } = ctx;
    const session = await getSession({ req });
    const tab = query.tab || 0;

    const wishlistData = await User.findById(session.user.id)
        .select("wishlist")
        .populate("wishlist.product")
        .lean();

    return {
        props: {
            user: session,
            wishlist: JSON.parse(JSON.stringify(wishlistData.wishlist)),
            tab,
        },
    };
}
